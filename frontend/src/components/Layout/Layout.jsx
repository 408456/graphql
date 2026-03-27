import React from 'react';
import { styles } from './Layout.styles';

const Layout = ({ children }) => (
    <div style={styles.container}>
        <div style={styles.content}>
            {children}
        </div>
    </div>
);

export default Layout;