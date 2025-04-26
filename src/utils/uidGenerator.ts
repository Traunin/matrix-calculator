let uid = 0;

export function uidGet() {
    uid++;
    return uid;
}