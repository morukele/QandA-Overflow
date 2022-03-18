BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Answer] (
    [answerId] INT NOT NULL IDENTITY(1,1),
    [questionId] INT NOT NULL,
    [content] NVARCHAR(max) NOT NULL,
    [userId] NVARCHAR(150) NOT NULL,
    [userName] NVARCHAR(150) NOT NULL,
    [created] DATETIME2 NOT NULL,
    CONSTRAINT [PK_Answer] PRIMARY KEY ([answerId])
);

-- CreateTable
CREATE TABLE [dbo].[Question] (
    [questionId] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(100) NOT NULL,
    [content] NVARCHAR(max) NOT NULL,
    [userId] NVARCHAR(150) NOT NULL,
    [userName] NVARCHAR(150) NOT NULL,
    [created] DATETIME2 NOT NULL,
    CONSTRAINT [PK_Question] PRIMARY KEY ([questionId])
);

-- CreateTable
CREATE TABLE [dbo].[SchemaVersions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [scriptName] NVARCHAR(255) NOT NULL,
    [applied] DATETIME NOT NULL,
    CONSTRAINT [PK_SchemaVersions_Id] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Answer] ADD CONSTRAINT [FK_Answer_Question] FOREIGN KEY ([questionId]) REFERENCES [dbo].[Question]([questionId]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
