const DELAY_TIME = 500;

module.exports = (() => {
    let pendingProcess;

    let pending;
    let pendingRequest;
    let prevRequestTime = (new Date()).getTime();

    let callRequest = (request, successFunc) => {
        pendingProcess = successFunc;
        request.then(() => {
            if(pendingProcess) {
                pendingProcess();
                pendingProcess = null;
            }
        })
    }

    let callReduceRequest = (requestFunc, successFunc) => {
        let checkTime = (new Date()).getTime();
        prevRequestTime = checkTime;
        pending = successFunc;
        pendingRequest = requestFunc;
        setTimeout(() => {
            if(pendingRequest) {
                let nowTime = (new Date()).getTime();
                if(nowTime - prevRequestTime >= DELAY_TIME) {
                    pendingRequest().then(() => {
                        if(pendding && prevRequestTime === checkTime) {
                            pendding();
                            pending = null;
                        }
                    });
                    pendingRequest = null;
                }
            }
        }, DELAY_TIME);
    }

    return { 
        callRequest: callRequest,
        callReduceRequest: callReduceRequest
    }
})()