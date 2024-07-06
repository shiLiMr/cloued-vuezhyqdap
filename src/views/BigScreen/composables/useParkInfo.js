import { getParkListApi } from '@/api/park';
import { ref } from 'vue';

export const useParkInfo = () => {
    let data  = ref()

    const getDatas = async () => {
        let res = await getParkListApi()
        console.log(res);
        data.value = res.data
    }
    return {
        data,
        getDatas
    }
}
