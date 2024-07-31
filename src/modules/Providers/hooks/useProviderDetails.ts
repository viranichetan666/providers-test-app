import { useCallback, useEffect, useState } from "react";
import fetchProviderByName, { IProviderDetails } from "../../../services/getProviderByname";

interface useProviderDetailsProps {
    skip?: boolean;
    name: string;
}

const useProviderDetails = ({ skip, name }: useProviderDetailsProps) => {
    const [providerDetails, setProviderDetails] = useState<IProviderDetails[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchProviderDetails = useCallback(async () => {
        try {
            setIsLoading(true)
            const result = await fetchProviderByName(name);
            if(result && result.apis) {
                const apis = result.apis
                const allProviderDetails = Object.values(apis)
                setProviderDetails(allProviderDetails);
            }
        } catch (error) {
            console.error('Error fetching provider list:', error);
        } finally {
            setIsLoading(false);
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