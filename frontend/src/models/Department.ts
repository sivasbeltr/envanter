/**
 * Represents a municipal department in the system
 */
export interface Department {
    /** Unique identifier for the department */
    id: string;
    /** Department name */
    name: string;
    /** Department code (used for references) */
    code: string;
    /** Optional description of the department */
    description?: string;
    /** Optional ID of the parent department */
    parentId?: string | null;
    /** Department manager name */
    managerName?: string;
    /** Number of employees in this department */
    employeeCount?: number;
    /** Whether the department is active */
    isActive: boolean;
    /** Child departments */
    children?: Department[];
}

/**
 * Data transfer object for creating a new department
 */
export interface DepartmentCreateDto {
    name: string;
    code: string;
    description?: string;
    parentId?: string | null;
    managerName?: string;
    employeeCount?: number;
    isActive: boolean;
}

/**
 * Data transfer object for updating an existing department
 */
export interface DepartmentUpdateDto {
    name?: string;
    code?: string;
    description?: string;
    parentId?: string | null;
    managerName?: string;
    employeeCount?: number;
    isActive?: boolean;
}
