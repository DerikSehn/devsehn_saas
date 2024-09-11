import styles from './loader.module.css'

export default function Loader() {
    return (
        <section className={styles.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </section>

    )
}
