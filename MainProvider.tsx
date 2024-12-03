"use client"
import { Provider } from 'react-redux';
import { store } from './store';

interface MainProviderProps {
    children: React.ReactNode; // Correct type for children
}

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default MainProvider;
