import React from 'react';

const GoTop = ({ scrollStepInPx, delayInMs }) => {

    const timeoutRef = React.useRef(null);

    React.useEffect(() => {
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                setThePosition(true)
            } else {
                setThePosition(false);
            }
        });
    }, [])

    const onScrollStep = () => {
        if (window.pageYOffset === 0) {
            clearInterval(timeoutRef.current);
        }
        window.scroll(0, window.pageYOffset - scrollStepInPx);
    }

    const scrollToTop = () => {
        timeoutRef.current = setInterval(onScrollStep, delayInMs);
    }

    const renderGoTopIcon = () => {
        return (
            <div onClick={scrollToTop}>
            </div>
        )
    }

    return (
        <React.Fragment>
            {renderGoTopIcon()}
        </React.Fragment>
    )
}

export default GoTop;