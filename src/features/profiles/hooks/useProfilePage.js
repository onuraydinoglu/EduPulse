import { useCallback, useEffect, useState } from "react";

import { PROFILE_MESSAGES } from "../constants/profileConstants";
import { profileService } from "../services/profileService";

export function useProfilePage(profileType, id) {
    const [profile, setProfile] = useState(null);
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    const showToast = useCallback((message, type = "success") => {
        setToast({ message, type });

        setTimeout(() => {
            setToast({ message: "", type: "success" });
        }, 2500);
    }, []);

    const loadProfile = useCallback(async () => {
        if (!profileType || !id) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const result = await profileService.getProfile(profileType, id);

            setProfile(result?.profile || null);
            setDetails(result?.details || {});
        } catch (error) {
            console.error(error);

            showToast(PROFILE_MESSAGES.LOAD_ERROR, "error");

            setProfile(null);
            setDetails({});
        } finally {
            setLoading(false);
        }
    }, [profileType, id, showToast]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    return {
        profile,
        details,
        loading,
        toast,
        showToast,
        reloadProfile: loadProfile,
    };
}