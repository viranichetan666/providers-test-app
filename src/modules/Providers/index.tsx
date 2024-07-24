import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AppExploreWebApisButton } from '../../components/AppButton';
import AppContainer from '../../components/AppContainer';
import AppSidebar from '../../components/AppSidebar';
import ProviderDetails from './components/ProviderDetails';
import useProviderDetails from './hooks/useProviderDetails';
import useProviders from './hooks/useProviders';

const Providers: React.FC = () => {
  const [showSiderbar, setShowSideBar] = useState<boolean>(false);
  const [activeProviderName, setactiveProviderName] = useState<string>("")
  const [showProviderDetails, setShowProviderDetails] = useState<boolean>(false)
  const { providers } = useProviders({ skip: !showSiderbar })
  const { providerDetails } = useProviderDetails({ name: activeProviderName })

  const handleShowProviderDetails = () => {
    setShowProviderDetails(true)
    setShowSideBar(false)
  }

  const handleExploreMoreApis = () => {
    setactiveProviderName("")
    setShowSideBar(true)
    setShowProviderDetails(false)
  }

  return (
    <div className={`${showSiderbar ?'bg-Light' : 'bg-dark' }`}>
        <AppContainer>
            {/* show provider details */}
            {showProviderDetails && providerDetails && <ProviderDetails providerDetails={providerDetails} />}
            <div className={showProviderDetails ? 'provider-explore-more-btn-container' : 'provider-explore-btn-container'}>
                <AppExploreWebApisButton onClick={handleExploreMoreApis}>
                    Explore { showProviderDetails ? 'more ': 'web '}  APIs
                </AppExploreWebApisButton>
            </div>
            
            {/* providers sidebar */}
            {showSiderbar && (
                <>
                    <div onClick={() => setShowSideBar(false)} className='sidebar-overlay'></div>
                    <AppSidebar className={showSiderbar ? 'siderbar-open' : 'siderbar-close'}>
                        <h2 className='provider'>Select Provider</h2>
                        {/* map all providers  */}
                        {providers?.map((item: string, index: number) => (
                        <div className='providerParent' key={index}>
                            {activeProviderName !== item && (
                            <div className='providerList' onClick={() => setactiveProviderName(item)}>
                                <span>{item}</span>
                                <span><IoIosArrowDown /></span>
                            </div>)}
                            {activeProviderName === item && (
                            <div className='providerDropDown'>
                                <div className='providerList'>
                                    <span>{item}</span>
                                    <span  onClick={() => {setactiveProviderName("")}}><IoIosArrowUp /></span>
                                </div>
                                <div className='providerData' onClick={handleShowProviderDetails}>
                                    <img className="provideImg" src={providerDetails?.info["x-logo"].url} alt="providerimg"/>
                                    <span>{providerDetails?.info.title}</span>
                                </div>
                            </div>)}
                        </div>
                        ))}
                    </AppSidebar>
                </>
            )}
        </AppContainer>
    </div>
  );
};

export default Providers;
