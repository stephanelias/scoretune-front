import {useQuery} from "@tanstack/react-query/build/modern/index";
import {getCurrentUser, login, register} from "../services/AuthService";
import {User} from "../models/User";
import {LoginResponseDto} from "../models/LoginResponseDto";
import {LoginRequestDto} from "../models/LoginRequestDto";
import {RegisterRequestDto} from "../models/RegisterRequestDto";
import {useMutation} from "@tanstack/react-query";

export function useRegister() {
    return useMutation<User, Error, RegisterRequestDto>({
        mutationFn: register,
    })
}