import { createSelector } from 'reselect';

const selectLayoutData = (state) => state.layout;

export const selectIsMobileLayout = createSelector([selectLayoutData], (layout) => !layout.isDesktopSize && !layout.isTabletSize);

export const selectIsTabletLayout = createSelector([selectLayoutData], (layout) => !layout.isDesktopSize && layout.isTabletSize);

export const selectIsDesktopLayout = createSelector([selectLayoutData], (layout) => layout.isDesktopSize && !layout.isTabletSize);

export const selectLayout = createSelector([selectIsDesktopLayout, selectIsTabletLayout], (desktop, tablet) => {
    return desktop ? 'desktop' : tablet ? 'tablet' : 'mobile'
})