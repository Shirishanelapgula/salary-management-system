interface Props {

  departmentId?:number;

  countryId?:number;


  onDepartmentChange(
    value:number | undefined
  ):void;


  onCountryChange(
    value:number | undefined
  ):void;

}



export default function EmployeeFilters(
{
 departmentId,
 countryId,
 onDepartmentChange,
 onCountryChange

}:Props){

return (

<div className="
flex
gap-4
">

<select

value={
 departmentId ?? ""
}

onChange={
 e =>
 onDepartmentChange(
   e.target.value
   ?
   Number(e.target.value)
   :
   undefined
 )
}

className="
border
rounded-lg
px-3
py-2
"

>

<option value="">
All Departments
</option>

<option value="1">
Engineering
</option>

<option value="2">
HR
</option>

</select>



<select

value={
 countryId ?? ""
}

onChange={
 e =>
 onCountryChange(
   e.target.value
   ?
   Number(e.target.value)
   :
   undefined
 )
}

className="
border
rounded-lg
px-3
py-2
"

>

<option value="">
All Countries
</option>


<option value="1">
India
</option>


<option value="2">
USA
</option>


</select>


</div>

);

}