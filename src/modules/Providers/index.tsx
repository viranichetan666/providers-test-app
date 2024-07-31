import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AppExploreWebApisButton } from "../../components/AppButton";
import AppContainer from "../../components/AppContainer";
import AppSidebar from "../../components/AppSidebar";
import ProviderDetails from "./components/ProviderDetails";
import useProviderDetails from "./hooks/useProviderDetails";
import useProviders from "./hooks/useProviders";
import classNames from "classnames";
import { IProviderDetails } from "../../services/getProviderByname";

const Providers: React.FC = () => {
    const [showSiderbar, setShowSideBar] = useState<boolean>(false);
    const [activeProviderName, setactiveProviderName] = useState<string>("");
    const [activeProviderDetails, setActiveProviderDetails] = useState<IProviderDetails>();
    const [showProviderDetails, setShowProviderDetails] = useState<boolean>(false);
    const [isProviderDetailCollapsed, setIsProviderDetailCollapsed] = useState<boolean>(false);
    const { providers } = useProviders();
    const { providerDetails, providerDetailsLoading, setProviderDetails } = useProviderDetails({
        name: activeProviderName
    });

    const handleShowProviderDetails = (provider: IProviderDetails) => {
        setActiveProviderDetails(provider)
        setShowProviderDetails(true);
        setShowSideBar(false);
    };

    const handleExploreMoreApis = () => {
        setactiveProviderName("");
        setShowSideBar(true);
        setShowProviderDetails(false);
    };

    const toggleProviderAccordionPanel = (item: string) => {
        console.log("item", item, 'activeProviderName', activeProviderName)
        if (activeProviderName === item) {
            setIsProviderDetailCollapsed(!isProviderDetailCollapsed);
        } else {
            setProviderDetails([] as IProviderDetails[]);
            setIsProviderDetailCollapsed(true);
            setactiveProviderName(item);
        }
    };

    return (
        <div className={`${showSiderbar ? "bg-Light" : "bg-dark"}`}>
            <AppContainer>
                {/* show provider details */}
                {showProviderDetails && activeProviderDetails && (
                    <ProviderDetails providerDetails={activeProviderDetails} />
                )}
                <div
                    className={
                        showProviderDetails
                            ? "provider-explore-more-btn-container"
                            : "provider-explore-btn-container"
                    }
                >
                    <AppExploreWebApisButton onClick={handleExploreMoreApis}>
                        Explore {showProviderDetails ? "more " : "web "} APIs
                    </AppExploreWebApisButton>
                </div>

                {/* providers sidebar */}
                {showSiderbar && (
                    <div
                        onClick={() => setShowSideBar(false)}
                        className="sidebar-overlay"
                    ></div>
                )}
                <AppSidebar
                    className={
                        showSiderbar ? "siderbar-open" : "siderbar-close"
                    }
                >
                    <h2 className="provider">Select Provider</h2>
                    {/* map all providers  */}
                    {providers?.map((item: string, index: number) => (
                        <div className="providerParent" key={index}>
                            <div className="providerDropDown">
                                <div
                                    className="providerList"
                                    onClick={() =>
                                        toggleProviderAccordionPanel(item)
                                    }
                                >
                                    <span>{item}</span>
                                    <span>
                                        {activeProviderName === item &&
                                        isProviderDetailCollapsed ? (
                                            <IoIosArrowUp />
                                        ) : (
                                            <IoIosArrowDown />
                                        )}
                                    </span>
                                </div>
                                <div
                                    className={classNames(
                                        'provider-accordion-detail-main-container',
                                        activeProviderName === item &&
                                            isProviderDetailCollapsed
                                            ? "accordion-open"
                                            : "accordion-close",
                                    )}
                                >
                                    {
                                        providerDetailsLoading &&
                                        <div>Loading...</div>
                                    }
                                    {
                                        !!providerDetails?.length && activeProviderName === item && isProviderDetailCollapsed && 
                                        providerDetails.map((provider, index) => {
                                            return (
                                                <div className="provider-accordion-detail" key={index} onClick={() => handleShowProviderDetails(provider)} >
                                                    <img
                                                        className="provideImg"
                                                        src={
                                                            provider?.info?.[
                                                                "x-logo"
                                                            ].url
                                                        }
                                                        alt="providerimg"
                                                    />
                                                    <span>
                                                        {provider?.info?.title}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                    {/* {providerDetails?.info && (
                                        <>
                                            <img
                                                className="provideImg"
                                                src={
                                                    providerDetails?.info?.[
                                                        "x-logo"
                                                    ].url
                                                }
                                                alt="providerimg"
                                            />
                                            <span>
                                                {providerDetails?.info?.title}
                                            </span>
                                        </>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    ))}
                </AppSidebar>
            </AppContainer>
        </div>
    );
};

export default Providers;
