import { useMemo } from "react";
import { useHistory } from "react-router-dom";

import { useQuery } from "../useQuery";
import { Path } from "../../constants/enums/path.enum";


export function useAddQueryParamData<T>(data: T, path: Path) {
    const history = useHistory();

    return () => {
        const string = JSON.stringify(data)
        const encodedString = btoa(string)
        history.push(`${path}?data=${encodedString}`);
    }
}

export function useExtractQueryParamData() {
    const query = useQuery();

    return useMemo(() => {
        const data = query.get('data');

        if (data) {
            const jsonString = atob(data);
            return JSON.parse(jsonString);
        }
    }, [query])
}