function EmptyProfileState({ text = "Kayıt bulunamadı." }) {
    return (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-200/30 p-8 text-center">
            <p className="text-sm font-semibold text-base-content/55">{text}</p>
        </div>
    );
}

export default EmptyProfileState;