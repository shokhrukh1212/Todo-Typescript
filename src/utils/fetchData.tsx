import toastMessage from "./toastMessage";

const fetchData = async (method: string, subdirectory: string, body?: any) => {
  const base_url: string = `http://localhost:3000/api/v1/${subdirectory}`;

  // options
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  };

  // try, catch blocks
  try {
    const res = await fetch(base_url, options);

    // if res ok status is not ok
    if (!res.ok) {
      // if the user is UNAUTHORIZED, must login again
      if (res.status === 401) {
        toastMessage("error", res.statusText);
        sessionStorage.clear();
        window.location.reload();
      }

      toastMessage("error", `${res.status}: ${res.statusText}`);
    }

    // handling when res has no Content to return
    if (res.status === 204) {
      return { status: res.status };
    }

    const data = await res.json();

    return { status: res.status, data };
  } catch (err: any) {
    return {
      status: err.status,
      message: err.message,
    };
  }
};

export default fetchData;
