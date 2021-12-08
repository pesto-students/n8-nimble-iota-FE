export default function componentLoader(fn, retriesLeft = 3, interval = 1000) {
    return new Promise((resolve, reject) => {
        fn()
            .then(resolve)
            .catch((error) => {
                setTimeout(() => {
                    if (retriesLeft === 1) {
                        reject(error);
                        return;
                    }
                    componentLoader(fn, retriesLeft - 1, interval).then(resolve, reject);
                }, interval);
            });
    });
}
