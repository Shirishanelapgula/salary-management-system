import { employeeService } from "../services/employee.service.js";
import { dashboardService } from "../services/dashboard.service.js";
import { ParsedIntent } from "../types/ai.types.js";

export class AIQueryExecutor {

    async execute(intent: ParsedIntent){

        switch(intent.intent){

            case "dashboard_summary":
                return dashboardService.getSummary();

            case "highest_paid":
                return dashboardService.getHighestPaidEmployees();

            case "lowest_paid":
                return dashboardService.getLowestPaidEmployees();

            case "employee_search":

                return employeeService.getEmployees({
                    page:1,
                    limit:20,
                    search:"",
                    designation:intent.filters?.designation,
                    department:intent.filters?.department,
                    country:intent.filters?.country
                });

            default:
                return {
                    message:"Sorry, I couldn't understand the request."
                };

        }

    }

}

export const aiQueryExecutor = new AIQueryExecutor();