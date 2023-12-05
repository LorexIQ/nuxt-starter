import type {Ref} from "vue";

interface UseModalProps {
    title: string;
    defaultStatus?: boolean;
}
export interface UseModal {
    open: () => void;
    close: () => void;
    status: Ref<boolean>;
    config: UseModalProps;
}

export default function (config: UseModalProps): UseModal {
    const currentStatus = ref(config?.defaultStatus ?? false);

    function open(): void {
        currentStatus.value = true;
    }
    function close(): void {
        currentStatus.value = false;
    }

    return {
        open,
        close,
        config,
        status: currentStatus
    };
}
