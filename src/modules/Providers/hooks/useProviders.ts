import { useEffect, useState } from "react";
import fetchProviderList from "../../../services/getProvidersList";

interface useProvidersProps {
    skip?: boolean
}

const useProviders = ({ skip }: useProvidersProps = { skip: false}) => {
    const [providers, setProviders] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchProviders = async () => {
        try {
            setIsLoading(true)
            const providersResult = await fetchProviderList();
            setProviders(providersResult.data);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching provider list:', error);
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (!skip) {
            fetchProviders();
        }
    }, [skip]);

    return {
        providers: providers,
        providersLoading: isLoading
    }

}

export default useProviders;