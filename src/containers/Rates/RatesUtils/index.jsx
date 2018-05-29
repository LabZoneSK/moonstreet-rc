import store from '../../../redux/store'

export function rateCall(ccKey, ccRate) {
    return store.getState().rates.getIn([ccKey, ccRate])
}
