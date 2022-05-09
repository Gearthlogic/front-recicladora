import { useEffect, useState, useCallback } from "react";
import { getMostFrequentElement } from "../../utils/array";

export const defaultSerialOptions: SerialOptions = {
    baudRate: 9600,
    parity: "even",
    stopBits: 2,
    dataBits: 7
}

export function defaultUnit8ArrayProccesser(data: Uint8Array) {
    const textDecorder = new TextDecoder('ascci')

    const decodedValue = textDecorder.decode(data);

    const valuesArray = decodedValue.split("").map(value => value.substring(3, 9));

    const value = parseInt(getMostFrequentElement(valuesArray));

    return {
        value, done: value > 0
    }
}

export function useSerialPort(
    options: SerialOptions = defaultSerialOptions,
    proccesser = defaultUnit8ArrayProccesser
) {
    const [port, setPort] = useState<SerialPort>();

    useEffect(() => {
        navigator.serial.getPorts().then(ports => {
            const readablePorts = ports.filter(port => port.readable);

            setPort(readablePorts[0])
        });
    }, []);

    const requestPort = useCallback(async () => {
        try {
            const port = await navigator.serial.requestPort();

            if (port.readable)
                throw new Error("El puerto no se puede leer. Revise si seleccionó el correcto o si esta bien conectado")

            setPort(port);
        } catch (error) {
            alert(`Ha ocurrido un error \n ${(error as Error).message }`);
        }
    }, []);

    const readFromSerial = useCallback(async () => {
        if (port) {
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
                            reader.cancel();
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
        }
    }, [port])

    return { readFromSerial, requestPort };
}