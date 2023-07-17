import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from '@helpers/store';

// Use throughout your app instead of plain `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
