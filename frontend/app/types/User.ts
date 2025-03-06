export type UserRole = 'admin' | 'manager' | 'waiter' | 'kitchen';

export interface User {
    id?: string;
    username: string;
    password?: string;
    role?: UserRole;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserPermissions {
    canManageMenu: boolean;
    canViewAnalytics: boolean;
    canManageStaff: boolean;
    canTakeOrders: boolean;
    canViewOrders: boolean;
    canUpdateOrderStatus: boolean;
}

export const getRolePermissions = (role: UserRole): UserPermissions => {
    switch (role) {
        case 'admin':
            return {
                canManageMenu: true,
                canViewAnalytics: true,
                canManageStaff: true,
                canTakeOrders: true,
                canViewOrders: true,
                canUpdateOrderStatus: true
            };
        case 'manager':
            return {
                canManageMenu: true,
                canViewAnalytics: true,
                canManageStaff: false,
                canTakeOrders: true,
                canViewOrders: true,
                canUpdateOrderStatus: true
            };
        case 'waiter':
            return {
                canManageMenu: false,
                canViewAnalytics: false,
                canManageStaff: false,
                canTakeOrders: true,
                canViewOrders: true,
                canUpdateOrderStatus: true
            };
        case 'kitchen':
            return {
                canManageMenu: false,
                canViewAnalytics: false,
                canManageStaff: false,
                canTakeOrders: false,
                canViewOrders: true,
                canUpdateOrderStatus: true
            };
        default:
            return {
                canManageMenu: false,
                canViewAnalytics: false,
                canManageStaff: false,
                canTakeOrders: false,
                canViewOrders: false,
                canUpdateOrderStatus: false
            };
    }
}; 