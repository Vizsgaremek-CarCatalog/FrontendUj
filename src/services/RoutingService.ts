import { useNavigate } from "react-router-dom";

class RoutingService {
    navigateToPage(navigate: ReturnType<typeof useNavigate>, path: string) {
        navigate(path);
    }

    navigateToHome(navigate: ReturnType<typeof useNavigate>) {
        this.navigateToPage(navigate, "/");
    }

    navigateToCars(navigate: ReturnType<typeof useNavigate>) {
        this.navigateToPage(navigate, "/cars");
    }

    navigateToError(navigate: ReturnType<typeof useNavigate>) {
        this.navigateToPage(navigate, "/error");
    }
}

export default new RoutingService();