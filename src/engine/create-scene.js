import {debounce} from './utils';

const DEFAULT_PROPS = {
    aspectX: 16,
    aspectY: 10,
    clearColor: 'rgba(0, 0, 0, 1)',
    root: document.body
};

export default (userProps = {}) => {
    const props = Object.assign({
        canvas: document.createElement('canvas')
    }, DEFAULT_PROPS, userProps);

    let animationFrame = null;
    let delta, xMin, xMax, ballSize;
    let x = props.canvas.width / 2;

    //
    function init() {
        let {canvas, root} = props;

        window.addEventListener('resize', () => {
            pause();
        });

        window.addEventListener('resize', debounce(() => {
            resize();
            play();
        }));
        resize();

        root.appendChild(canvas);
    }

    //
    function play() {
        let {canvas} = props;
        let context = canvas.getContext('2d');

        animationFrame = window.requestAnimationFrame(play);
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
        context.arc(x, canvas.height / 2, ballSize, 0, Math.PI * 2);
        context.fillStyle = '#09f';
        context.fill();
        context.closePath();

        x = x + delta;

        if ((x > xMax) || (x < xMin)) {
            delta = -delta;
        }
    }

    //
    function pause() {
        if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }

    //
    function resize() {
        let {canvas, aspectX, aspectY, root} = props;
        let containerWidth = root.innerWidth || root.clientWidth;
        let containerHeight = root.innerHeight || root.clientHeight;

        let canvasWidth = containerWidth;
        let canvasHeight = (containerWidth * aspectY) / aspectX;

        if (canvasHeight > containerHeight) {
            canvasHeight = containerHeight;
            canvasWidth = (containerHeight * aspectX) / aspectY;
        }

        canvas.setAttribute('width', Math.floor(canvasWidth));
        canvas.setAttribute('height', Math.floor(canvasHeight));

        let oldDelta = delta || Math.floor(canvas.width / 100);

        ballSize = Math.floor(canvas.width * 0.03);
        delta = Math.floor(canvas.width / 100);
        x = (delta * x) / oldDelta;
        xMin = ballSize;
        xMax = canvas.width - ballSize;

        // console.log('Stuff', x, delta, xMin, xMax, ballSize);
    }

    return {
        props,
        init,
        play
    };
}
