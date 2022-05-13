import { useEffect, useState, useCallback } from "react";
import { getMostFrequentElement } from "../../utils/array";

export const defaultSerialOptions: SerialOptions = {
    baudRate: 9600,
    parity: "even",
    stopBits: 2,
    dataBits: 7
}

export function defaultUnit8ArrayProccesser(data: Uint8Array) {
    const textDecorder = new TextDecoder('ascii')

    const decodedValue = textDecorder.decode(data);

    const valuesArray = decodedValue.split("").map(value => value.substring(3, 9));

    const value = parseInt(getMostFrequentElement(valuesArray));

    return {
        value, done: value >= 0
    }
}

export function useSerialPort(
    options: SerialOptions = defaultSerialOptions,
    proccesser = defaultUnit8ArrayProccesser
) {
    const [port, setPort] = useState<SerialPort>();

    useEffect(() => {
        navigator.serial.getPorts().then(ports => {
            setPort(ports[0])
        });
    }, []);

    const requestPort = useCallback(async () => {
        try {
            if (!navigator.serial)
                throw new Error("La conexión con la balanza no esta soportada por el navegador")

            const selected = await navigator.serial.requestPort();

            setPort(selected);
        } catch (error) {
            alert(`Ha ocurrido un error \n ${(error as Error).message}`);
        }
    }, []);

    const readFromSerial = useCallback(async () => {
        if (!port) throw new Error("No se conecto la balanza")

        await port.open(options);

        let finalValue = undefined;
        let keepReading = true

        while (port.readable && keepReading) {
            const reader = port.readable.getReader();

            try {
                while (true) {
                    const { value, done } = await reader.read();

                    if (done) break;

                    const result = proccesser(value);

                    if (result.done) {
                        finalValue = result.value;
                        keepReading = false;

                        await reader.cancel();
                    }
                }

            } catch (error) {
                console.error(error)
            } finally {
                reader.releaseLock();
            }
        }

        await port.close();

        return finalValue;
    }, [port, options, proccesser])

    return { readFromSerial, requestPort };
}