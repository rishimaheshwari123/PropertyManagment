import { apiConnector } from "../apiConnector";
import { admin } from "../api";
import Swal from "sweetalert2";
const {
    CREATE_CATEGORY,
    GET_ALL_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    IMAGE_UPLOAD,
    CREATE_PROPERTY_INFORMATION,
    GET_ALL_PROPERTY_INFORMATION,
    DELETE_PROPERTY,
    CREATE_PROPERTY_COMMITI,
    GET_ALL_PROPERTY_COMMITI,
    DELETE_PROPERTY_COMMITI,
    CREATE_UNITS,
    DELETE_UNITS,
    GET_ALL_UNITS
} = admin;


export async function createCategoryApi(name) {
    Swal.fire({
        title: "Creating Category...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    try {
        const response = await apiConnector("POST", CREATE_CATEGORY, { name });
        Swal.close();

        if (!response?.data?.success) {
            await Swal.fire({
                title: "Category Creation Failed",
                text: response.data.message,
                icon: "error",
            });
            throw new Error(response.data.message);
        }

        Swal.fire({
            title: response.data.message,
            text: "Your category has been added.",
            icon: "success",
        });

        return response.data.category;
    } catch (error) {
        console.log("CREATE CATEGORY ERROR............", error);
        Swal.fire({
            title: "Failed to Create Category",
            text:
                error.response?.data?.message ||
                "Something went wrong, please try again later.",
            icon: "error",
        });
        throw error;
    }
}


export async function getAllCategoryApi() {
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_CATEGORY);
        if (!response?.data?.success) {
            await Swal.fire({
                title: "Category Creation Failed",
                text: response.data.message,
                icon: "error",
            });
            throw new Error(response.data.message);
        }
        result = response.data.categories;
        return result;
    } catch (error) {

        console.log("CREATE CATEGORY ERROR............", error);
        Swal.fire({
            title: "Failed to Create Category",
            text:
                error.response?.data?.message ||
                "Something went wrong, please try again later.",
            icon: "error",
        });
        return result
    }
}

export const deleteCategoryApi = async (id) => {
    try {
        const response = await apiConnector("DELETE", `${DELETE_CATEGORY}/${id}`);
        if (!response?.data?.success) {
            Swal.fire({
                title: "Delete Failed",
                text: response.data.message,
                icon: "error",
            });
            throw new Error(response.data.message);
        }
        Swal.fire({
            title: "Deleted",
            text: "Category deleted successfully!",
            icon: "success",
        });
        return true;
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: error.response?.data?.message || "Something went wrong. Try again later.",
            icon: "error",
        });
        return false; // Return false on failure
    }
};

export const updateCategoryApi = async (id, name) => {
    try {
        const response = await apiConnector("PUT", `${UPDATE_CATEGORY}/${id}`, { name });
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};


export const imageUpload = async (data) => {
    let result = [];
    const toastId = Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    try {
        const formData = new FormData();
        for (let i = 0; i < data.length; i++) {
            formData.append("thumbnail", data[i]);
        }

        const response = await apiConnector("POST", IMAGE_UPLOAD, formData);

        if (!response?.data?.success) {
            throw new Error("Could Not Add Image Details");
        }

        Swal.fire({
            icon: "success",
            title: "Image Details Added Successfully",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
        });

        result = response?.data?.images;
    } catch (error) {
        console.log("CREATE IMAGE API ERROR............", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
        });
    } finally {
        Swal.close(toastId);
    }

    return result;
};


export async function handleCreatePropertyInforamtionAPi(propertyData) {
    // Show loading alert
    Swal.fire({
        title: "Creating Property Information...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    try {
        // Send POST request with propertyData
        const response = await apiConnector("POST", CREATE_PROPERTY_INFORMATION, { propertyData });

        // Close the loading alert
        Swal.close();

        // Check if the API response indicates success
        if (!response?.data?.success) {
            await Swal.fire({
                title: "Property Information Creation Failed",
                text: response.data.message || "Failed to create property information.",
                icon: "error",
            });
            throw new Error(response.data.message);
        }

        // Show success message
        Swal.fire({
            title: "Success!",
            text: response.data.message || "Property information has been added.",
            icon: "success",
        });

        // Return the created property data (optional)
        return response.data.property;
    } catch (error) {
        // Handle errors and show error message
        console.error("CREATE PROPERTY ERROR:", error);
        Swal.fire({
            title: "Failed to Create Property Information",
            text: error.response?.data?.message || "Something went wrong, please try again later.",
            icon: "error",
        });
        throw error; // Re-throw the error for further handling if necessary
    }
}




export async function getAllPropertyInformationApi(id) {
    let result = [];
    try {
        const response = await apiConnector("GET", `${GET_ALL_PROPERTY_INFORMATION}/${id}`);
        if (!response?.data?.success) {
            await Swal.fire({
                title: "Failed to Fetch Property Information",
                text: response.data.message,
                icon: "error",
            });
            throw new Error(response.data.message);
        }
        result = response.data.properties;
        return result;
    } catch (error) {
        console.log("FETCH PROPERTY INFORMATION ERROR............", error);
        Swal.fire({
            title: "Failed to Fetch Property Information",
            text: error.response?.data?.message || "Something went wrong, please try again later.",
            icon: "error",
        });
        return result;
    }
}


export const deletePropertyInformationApi = async (id) => {
    try {
        const response = await apiConnector("DELETE", `${DELETE_PROPERTY}/${id}`);
        if (!response?.data?.success) {
            Swal.fire({
                title: "Delete Failed",
                text: response.data.message,
                icon: "error",
            });
            throw new Error(response.data.message);
        }
        Swal.fire({
            title: "Deleted",
            text: "Category deleted successfully!",
            icon: "success",
        });
        return true;
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: error.response?.data?.message || "Something went wrong. Try again later.",
            icon: "error",
        });
        return false;
    }
};


export async function handleCreatePropertyCommitiAPi(propertyData) {
    // Show loading alert
    Swal.fire({
        title: "Creating Property Information...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    try {
        // Send POST request with propertyData
        const response = await apiConnector("POST", CREATE_PROPERTY_COMMITI, { propertyData });

        // Close the loading alert
        Swal.close();

        // Check if the API response indicates success
        if (!response?.data?.success) {
            await Swal.fire({
                title: "Property Information Creation Failed",
                text: response.data.message || "Failed to create property information.",
                icon: "error",
            });
            throw new Error(response.data.message);
        }

        // Show success message
        Swal.fire({
            title: "Success!",
            text: response.data.message || "Property information has been added.",
            icon: "success",
        });

        // Return the created property data (optional)
        return response.data.property;
    } catch (error) {
        // Handle errors and show error message
        console.error("CREATE PROPERTY ERROR:", error);
        Swal.fire({
            title: "Failed to Create Property Information",
            text: error.response?.data?.message || "Something went wrong, please try again later.",
            icon: "error",
        });
        throw error; // Re-throw the error for further handling if necessary
    }
}

export async function getAllCommitiApi(id) {
    let result = [];
    try {
        const response = await apiConnector("GET", `${GET_ALL_PROPERTY_COMMITI}/${id}`);
        if (!response?.data?.success) {
            await Swal.fire({
                title: "Failed to Fetch Property Information",
                text: response.data.message,
                icon: "error",
            });
            throw new Error(response.data.message);
        }
        result = response.data.properties;
        return result;
    } catch (error) {
        console.log("FETCH PROPERTY INFORMATION ERROR............", error);
        Swal.fire({
            title: "Failed to Fetch Property Information",
            text: error.response?.data?.message || "Something went wrong, please try again later.",
            icon: "error",
        });
        return result;
    }
}


export const deleteCommitiApi = async (id) => {
    try {
        const response = await apiConnector("DELETE", `${DELETE_PROPERTY_COMMITI}/${id}`);
        if (!response?.data?.success) {
            Swal.fire({
                title: "Delete Failed",
                text: response.data.message,
                icon: "error",
            });
            throw new Error(response.data.message);
        }
        Swal.fire({
            title: "Deleted",
            text: "Category deleted successfully!",
            icon: "success",
        });
        return true;
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: error.response?.data?.message || "Something went wrong. Try again later.",
            icon: "error",
        });
        return false;
    }
};
export async function handleCreateUnitsAPi(propertyData) {
    // Show loading alert
    Swal.fire({
        title: "Creating Property Information...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    try {
        // Send POST request with propertyData
        const response = await apiConnector("POST", CREATE_UNITS, { propertyData });

        // Close the loading alert
        Swal.close();

        // Check if the API response indicates success
        if (!response?.data?.success) {
            await Swal.fire({
                title: "Property Information Creation Failed",
                text: response.data.message || "Failed to create property information.",
                icon: "error",
            });
            throw new Error(response.data.message);
        }

        // Show success message
        Swal.fire({
            title: "Success!",
            text: response.data.message || "Property information has been added.",
            icon: "success",
        });

        // Return the created property data (optional)
        return response.data.property;
    } catch (error) {
        // Handle errors and show error message
        console.error("CREATE PROPERTY ERROR:", error);
        Swal.fire({
            title: "Failed to Create Property Information",
            text: error.response?.data?.message || "Something went wrong, please try again later.",
            icon: "error",
        });
        throw error; // Re-throw the error for further handling if necessary
    }
}

export async function getAllUnitsApi(id) {
    let result = [];
    try {
        const response = await apiConnector("GET", `${GET_ALL_UNITS}/${id}`);
        if (!response?.data?.success) {
            await Swal.fire({
                title: "Failed to Fetch Property Information",
                text: response.data.message,
                icon: "error",
            });
            throw new Error(response.data.message);
        }
        result = response.data.properties;
        return result;
    } catch (error) {
        console.log("FETCH PROPERTY INFORMATION ERROR............", error);
        Swal.fire({
            title: "Failed to Fetch Property Information",
            text: error.response?.data?.message || "Something went wrong, please try again later.",
            icon: "error",
        });
        return result;
    }
}


export const deleteUnitsApi = async (id) => {
    try {
        const response = await apiConnector("DELETE", `${DELETE_UNITS}/${id}`);
        if (!response?.data?.success) {
            Swal.fire({
                title: "Delete Failed",
                text: response.data.message,
                icon: "error",
            });
            throw new Error(response.data.message);
        }
        Swal.fire({
            title: "Deleted",
            text: "Category deleted successfully!",
            icon: "success",
        });
        return true;
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: error.response?.data?.message || "Something went wrong. Try again later.",
            icon: "error",
        });
        return false;
    }
};

