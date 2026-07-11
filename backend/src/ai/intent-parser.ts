import { ParsedIntent } from "../types/ai.types.js";

export function parseIntent(query: string): ParsedIntent {

    const q = query.toLowerCase();

    if(q.includes("highest"))
        return { intent:"highest_paid" };

    if(q.includes("lowest"))
        return { intent:"lowest_paid" };

    if(q.includes("summary"))
        return { intent:"dashboard_summary" };

    if(q.includes("average"))
        return { intent:"salary_stats" };

    if(q.includes("engineering"))
        return {
            intent:"employee_search",
            filters:{
                department:"Engineering"
            }
        };

    if(q.includes("india"))
        return {
            intent:"employee_search",
            filters:{
                country:"India"
            }
        };

    const gt=q.match(/above (\d+)/);

    if(gt){
        return{
            intent:"employee_search",
            filters:{
                salaryGreaterThan:Number(gt[1])
            }
        };
    }

    return{
        intent:"unknown"
    };
}