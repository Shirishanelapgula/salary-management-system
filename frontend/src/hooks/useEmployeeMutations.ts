import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";


import {
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../api/employee.api";


export function useEmployeeMutations() {

  const queryClient =
    useQueryClient();


  const create =
    useMutation({

      mutationFn:
        createEmployee,


      onSuccess() {

        queryClient.invalidateQueries({
          queryKey:["employees"]
        });

      }

    });



  const update =
    useMutation({

      mutationFn:
        ({
          id,
          payload
        }:{
          id:number;
          payload:unknown;
        }) =>
          updateEmployee(
            id,
            payload
          ),


      onSuccess(){

        queryClient.invalidateQueries({
          queryKey:["employees"]
        });

      }

    });



  const remove =
    useMutation({

      mutationFn:
        deleteEmployee,


      onSuccess(){

        queryClient.invalidateQueries({
          queryKey:["employees"]
        });

      }

    });



  return {
    create,
    update,
    remove
  };

}