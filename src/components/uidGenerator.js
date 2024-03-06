let uid = 0;

export default {
    methods: {
        uidGet() {
            uid++;
            return uid;
        }
    }
}