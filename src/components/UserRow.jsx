import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useNavigate} from 'react-router-dom'
import { icons } from "../assets";
import { removeUser, updateUser } from "../services/user";

function UserRow({ item }) {
    const queryClient = useQueryClient();
    const navigate = useNavigate()


    const removeUserMutation = useMutation((id) => removeUser(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });

    const updateUserMutation = useMutation(updateUser, {
        onSuccess : () => {
            queryClient.invalidateQueries(['users'])
        }
    })

    return (
         <tr>
            <td>
                {item.name}
            </td>
            <td><p>{item.username}</p></td>
            <td> {item.email}</td>
            <td>
                {item.role}
            </td>
            <td>
                {item?.role === 'user' && (
                <button onClick = {() => updateUserMutation.mutate({id: item._id, obj: item})}>
                    Make Admin
                </button>
            )}
            </td>
            <td>
                     <img
                alt={item.name}
                className="product-icon"
                src={icons.crossIcon}
                onClick={() => removeUserMutation.mutate(item._id)}
            />
                
            </td>
        </tr>
        // <li className="product-row d-flex justify-content-around align-items-center">
            

        //     <h2>{item.name}</h2>
        //     <h2>{item.username}</h2>
        //     <p>{item.email}</p>
        //     <p>{item.role}</p>

            // {item?.role === 'user' && (
            //     <button>
            //         Make Admin
            //     </button>
            // )}
            
        //     <img
        //         alt={item.name}
        //         className="product-icon"
        //         src={icons.crossIcon}
        //         onClick={() => removeUserMutation.mutate(item._id)}
        //     />
        // </li>
    );
}

export default UserRow;
