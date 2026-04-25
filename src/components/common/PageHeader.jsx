function PageHeader({ title, description, children }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-base-content/60">
            {description}
          </p>
        )}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}

export default PageHeader;