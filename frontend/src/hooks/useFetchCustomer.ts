import React, {  useEffect, useState } from "react";

export const useFetchCustomer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch category");
        }
        const data = await res.json();
        setUsers(data.data);
        console.log(data);
        
        
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUsers()
  }, []);
  return {users, setUsers};
};
