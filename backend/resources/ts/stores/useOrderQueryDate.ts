import { atom } from "recoil";
import { useRecoilState } from "recoil"

const queryDateState = atom<Date>({
    key: "queryDate",
    default: new Date()
})

const useOrderQueryDate = () => {

    return useRecoilState(queryDateState)
}
export default useOrderQueryDate