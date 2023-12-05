import type {Ref} from "vue";

type UtilsStructAnyObject = { [name: string]: any; };

interface UseUtils {
    getUID(): number;
    unwrapSet<T extends UtilsStructAnyObject, K extends keyof T, V extends T[K]['value']>(context: T, key: K, value: V): void;
    unwrap<T>(v: Ref<T> | T): T;
}

class Utils implements UseUtils {
    uidOffset = 0;

    getUID(): number {
        return this.uidOffset++;
    }

    unwrapSet<
        T extends UtilsStructAnyObject,
        K extends keyof T,
        V extends T[K]['value']
    >(context: T, key: K, value: V): void {
        if (isRef(context[key])) {
            context[key].value = value;
        } else {
            context[key] = value as T[K];
        }
    }
    unwrap<T>(v: Ref<T> | T): T {
        return isRef(v) ? v.value : v;
    }
}

const utilsObj = new Utils();
export default function (): UseUtils {
    return utilsObj;
}
