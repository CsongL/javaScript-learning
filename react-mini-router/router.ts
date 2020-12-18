import React, {useState, useEffect, ReactNode} from 'react';
import {history, Location} from './history'

interface RouteContextProps {
	history: typeof history;
	location: Location;
}

export const RouterContext = React.createContext<RouterContextProps | null>(
	null,
);

export const Router: React.FC = ({ children }) => {
	const [location, setLocation] = useState(history.location);
	//  初始化的时候， 订阅history的变化
	//  一旦路由发生改变 就会通知使用了userContext(RouterContext) 的子组件去重新渲染
	useEffect(() => {
		const unlisten = history.listen(location => {
			setLocation(location);
		})
		return unlisten;
	}, []);
	
	return (
	<RouterContext.Provider value = {{history, location}})>
		{children}
	</RouterContext.Provider>
	);
};


