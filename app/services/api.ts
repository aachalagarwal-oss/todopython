import axios from "axios";

//kuch bhi repeat na karna ho abr bar use karte time toh add it in create
const publicApi = axios.create({ baseURL: "http://localhost:8000" });

const privateApi = axios.create({ baseURL: "http://localhost:8000" });

//use matlab jaha bhi use akrenge woh iss token se hoke jayegi...It acts like a middleware.
privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await publicApi.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const posttask = async (title: string, desc: string) => {
  try {
    const response = await privateApi.post("/tasks", {
      title,
      description: desc,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const gettask = async () => {
  try {
    const res = await privateApi.get("/tasks");

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updatetask = async (id: number, status: string) => {
  try {
    const res = await privateApi.put(`/tasks/${id}`, {
        status,
    });
   return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateanytask = async (
  id: number,
  title: string,
  description: string,
) => {
  try {
    const res = await privateApi.put(`/tasks/${id}`, {
        title: title,
        description: description,
   
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deletetask = async (id: number) => {
  const token = localStorage.getItem("token");
  try {
    const res = await privateApi.delete(`/tasks/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
