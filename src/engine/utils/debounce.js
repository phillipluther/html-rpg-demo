export default (callback, threshold = 20) => {
    let timeout;
    let execution = () => {
        clearTimeout(timeout);
        timeout = setTimeout(callback, threshold);
    };

    return execution;
}
