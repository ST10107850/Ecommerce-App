import { apiSlice } from "./apiSlice";

const USER_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem('token'); // Retrieve the token (assuming it's stored in localStorage)
        return {
          url: `${USER_URL}/profile`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: data,
        };
      },
    }),
    
    registerUser: builder.mutation({
      query: ({firstName, lastName, email, password}) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: {firstName, lastName, email, password},
      }),
    }),
    
  }),
});

export const { useLoginMutation, useLogoutMutation, useUpdateUserMutation, useRegisterUserMutation } =
  userApiSlice;
