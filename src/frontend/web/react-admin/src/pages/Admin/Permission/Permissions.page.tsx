import { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import DisplayPermissions from './components/DisplayPermissions';
import { Permission } from '../../../generated/models';
import { ReduxProps } from '../../../redux/configureStore';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { PermissionsApi } from '../../../generated';


const Permissions = () => {

  const state = useSelector((state: ReduxProps) => state);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {  
    const apiParams: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const permissionsApi = new PermissionsApi({...state.environment, accessToken: apiParams});

    setIsLoading(true)
    
    permissionsApi.permissionsIndex('Bearer ' + apiParams)
    .then((response) => {  
      if(response && response.data){        
        if(response.data.success === true){ setPermissions(response.data.content) }
      }
    })
    .catch((error) => {
      alert(error?.response?.data?.message)
    })
    .finally(() => {
      setIsLoading(false)
    });   
  }, []);
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Permissions" />
        <DisplayPermissions  permissions={permissions} isLoading={isLoading}/>
    </DefaultLayout>
  );
};

export default Permissions;
