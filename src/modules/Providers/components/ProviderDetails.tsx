import React from 'react'
import { IProviderDetails } from '../../../services/getProviderByname'

interface ProviderDetailsProps {
    providerDetails: IProviderDetails | undefined;
}

const ProviderDetails:React.FC<ProviderDetailsProps> = ({ providerDetails }) => {
  return (
    <div className='dataDisplay'>
        <div className='heading'>
            <img src={providerDetails?.info['x-logo'].url} alt='providerimg'/>
            <h1 style={{marginLeft:"3px"}}>{providerDetails?.info.title}</h1>
        </div>
        <div className='parentDiv'>
            <div className='title'>Description</div>
            {
                providerDetails?.info.description &&
                <div dangerouslySetInnerHTML={{__html: providerDetails?.info.description}}></div>
            }
        </div>
        <div className='parentDiv'>
            <div className='title'>Swagger</div>
            <div>{providerDetails?.swaggerUrl}</div>
        </div>
        <div className='parentDiv'>
            <div className='title'>Contact</div>
            <div>Email &ensp;&ensp;&ensp;&ensp;{providerDetails?.info.contact?.email}</div>
            <div>Name&ensp;&ensp;&ensp;&ensp;{providerDetails?.info.contact?.name}</div>
            <div>Url&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{providerDetails?.info.contact?.url}</div>
        </div>
    </div>
  )
}

export default ProviderDetails