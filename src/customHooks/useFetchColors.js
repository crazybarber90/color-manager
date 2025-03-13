import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setColors, setStatus, setError } from '../store/colorSlice'
import { fetchColors } from '../apiCalls/ApiCalls'

const useFetchColors = () => {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.colors.status)

  useEffect(() => {
    const loadColors = async () => {
      dispatch(setStatus('loading'))
      try {
        const data = await fetchColors()
        dispatch(setColors(data))
        dispatch(setStatus('idle'))
      } catch (err) {
        dispatch(setError('Error while loading colors'))
        dispatch(setStatus('failed'))
        console.error('Error', err)
      }
    }

    if (status === 'idle') {
      loadColors()
    }
  }, [])
}

export default useFetchColors
