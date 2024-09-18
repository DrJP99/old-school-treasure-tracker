import { ReactNode, useEffect, useRef } from 'react'

interface ModalProps {
    children: ReactNode
    closeModal: () => void
}

const Modal = ({ children, closeModal }: ModalProps) => {
    const modalRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        const handleKeydown = (e: any) => {
            if (e.key === 'Escape') {
                closeModal()
            }
        }

        document.addEventListener('keydown', handleKeydown)

        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeydown)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="modal">
            <div className="modal-main" ref={modalRef}>
                {/* <button onClick={closeModal}>&times;</button> */}
                {children}
            </div>
        </div>
    )
}

export default Modal
