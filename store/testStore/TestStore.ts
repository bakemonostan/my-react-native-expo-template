// store/counter.store.ts
import { create } from 'zustand'
import { createResetAction, withPersist } from '../store.utils'

interface CounterState {
  count: number
  increment: () => void
  reset: () => void
}

const initialState = {
  count: 0,
}

const useCounterStore = create(
  withPersist<CounterState>(
    (set) => ({
        ...initialState,
        ...createResetAction(initialState)(set),
      increment: () => set((state) => ({ count: state.count + 1 }))
    }),
    'counter-store'
  )
)

export { useCounterStore }
