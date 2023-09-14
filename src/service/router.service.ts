class RouterService {
    updateUrlParam = (routerInstance: any, paramName: string, paramValue: string) => {
        let currentQuery = { ...routerInstance.query }
        currentQuery[paramName] = paramValue;
        routerInstance.push({
            pathname: routerInstance.pathname, // keep the same URL path
            query: currentQuery, // update the query parameters
        });
    }

    navigate = (router: any, pathname: string, query: string, shallow: boolean) => {
        router.push(
            {
                pathname: pathname,
                query: query,
            },
            undefined,
            { shallow: shallow }
        );
    }

}

export default new RouterService();
