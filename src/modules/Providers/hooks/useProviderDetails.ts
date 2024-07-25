import { useCallback, useEffect, useState } from "react";
import fetchProviderByName, { IProviderDetails } from "../../../services/getProviderByname";

interface useProviderDetailsProps {
    skip?: boolean;
    name: string;
}

const useProviderDetails = ({ skip, name }: useProviderDetailsProps) => {
    const [providerDetails, setProviderDetails] = useState<IProviderDetails>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchProviderDetails = useCallback(async () => {
        try {
            setIsLoading(true)
            const result = await fetchProviderByName(name);
            if(result && result.apis) {
                const apis = result.apis
                const firstProviderDetails = apis[Object.keys(apis)[0]]
                setProviderDetails(firstProviderDetails);
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error('Error fetching provider list:', error);
        }
    }, [name])


    useEffect(() => {
        if (!skip && name) {
            fetchProviderDetails();
        }
    }, [skip, name, fetchProviderDetails]);

    return {
        providerDetails: providerDetails,
        providerDetailsLoading: isLoading,
        setProviderDetails: setProviderDetails
    }

}

export default useProviderDetails;