// Breakpoints
// The grid and utilities use this common set of six breakpoints.

// Breakpoint	Range
// small	320px - 479px
// medium	480px - 639px
// large	640px - 1023px
// extra large	1024px - 1365px
// exta extra large	1366px - 1919px
// extra extra extra large	1920px and up

const BREAKPOINTS = {
    sm: [320, 479],
    md: [480, 639],
    lg: [640, 1023],
    xl: [1024, 1365],
    xxl: [1366, 1919],
    xxxl: [1920, 4000],
}

export default function GetBreakpoint() {
    const windowWidth = window.innerWidth;
    const [breakpoint] = Object.keys(BREAKPOINTS).filter(key => {
        const [f, t] = BREAKPOINTS[key];
        if (windowWidth < f) {
            return false;
        }
        if (t) {
            return windowWidth <= t;
        }
        return true;
    });
    return breakpoint;
}