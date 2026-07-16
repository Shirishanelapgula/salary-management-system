import type { ParsedIntent } from "../types/ai.types.js";

export function parseIntent(query: string): ParsedIntent {
    const q = query.toLowerCase().trim();

    // ==========================
    // Highest Paid Employees
    // ==========================
    if (
        containsAny(q, [
            "highest paid",
            "highest salary",
            "top salary",
            "top salaries",
            "highest earning",
            "highest earners",
            "maximum salary",
            "richest employee",
            "highest paid employees",
        ])
    ) {
        return {
            intent: "highest_paid",
        };
    }

    // ==========================
    // Lowest Paid Employees
    // ==========================
    if (
        containsAny(q, [
            "lowest paid",
            "lowest salary",
            "minimum salary",
            "least salary",
            "lowest earning",
            "bottom salary",
            "lowest paid employees",
        ])
    ) {
        return {
            intent: "lowest_paid",
        };
    }

    // ==========================
    // Total Payroll
    // ==========================
    if (
        containsAny(q, [
            "total payroll",
            "payroll",
            "salary budget",
            "monthly payroll",
            "overall payroll",
            "company payroll",
            "total salary",
        ])
    ) {
        return {
            intent: "total_payroll",
        };
    }

    // ==========================
    // Employee Count
    // ==========================
    if (
        containsAny(q, [
            "employee count",
            "employees count",
            "how many employees",
            "number of employees",
            "total employees",
            "employee total",
        ])
    ) {
        return {
            intent: "employee_count",
        };
    }

    // ==========================
    // Department Count
    // ==========================
    if (
        containsAny(q, [
            "department count",
            "departments count",
            "how many departments",
            "number of departments",
            "total departments",
        ])
    ) {
        return {
            intent: "department_count",
        };
    }

    // ==========================
    // Country Count
    // ==========================
    if (
        containsAny(q, [
            "country count",
            "countries count",
            "how many countries",
            "number of countries",
            "total countries",
        ])
    ) {
        return {
            intent: "country_count",
        };
    }

    // ==========================
    // Average Salary
    // ==========================
    if (
        containsAny(q, [
            "average salary",
            "avg salary",
            "mean salary",
            "salary average",
        ])
    ) {
        return {
            intent: "average_salary",
        };
    }

    // ==========================
    // Employees By Department
    // ==========================
    if (
        containsAny(q, [
            "employees by department",
            "department employees",
            "employees in department",
        ])
    ) {
        return {
            intent: "employees_by_department",
        };
    }

    // ==========================
    // Employees By Country
    // ==========================
    if (
        containsAny(q, [
            "employees by country",
            "country employees",
            "employees in country",
        ])
    ) {
        return {
            intent: "employees_by_country",
        };
    }

    // ==========================
    // Recent Employees
    // ==========================
    if (
        containsAny(q, [
            "recent employees",
            "new employees",
            "latest employees",
            "recent joins",
            "new joiners",
        ])
    ) {
        return {
            intent: "recent_employees",
        };
    }
    // ==========================
    // Employees in Country
    // ==========================
    if (q.startsWith("employees in ")) {
        const country = q
            .replace("employees in ", "")
            .trim();

        return {
            intent: "employees_by_country_name",
            entity:
                country.charAt(0).toUpperCase() +
                country.slice(1),
        };
    }

    // ==========================
    // Department Salary Report
    // ==========================
    if (
        containsAny(q, [
            "department salary report",
            "salary report",
            "department payroll",
            "salary by department",
        ])
    ) {
        return {
            intent: "department_salary_report",
        };
    }

    if (
        containsAny(q, [
            "highest paid",
            "highest salary",
            "top salary",
            "top salaries",
            "maximum salary",
            "highest earning",
            "highest earning employee",
            "highest pay",
            "top paid employee",
            "richest employee",
            "top one employee",
            "employee with highest pay",
        ])
    ) {
        return {
            intent: "highest_paid",
            limit: q.includes("top one") || q.includes("top 1") ? 1 : 10,
        };
    }

    // ==========================
    // Default
    // ==========================
    return {
        intent: "unknown",
    };
}

function containsAny(query: string, phrases: string[]) {
    return phrases.some((phrase) => query.includes(phrase));
}