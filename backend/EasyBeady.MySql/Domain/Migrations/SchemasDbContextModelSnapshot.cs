﻿// <auto-generated />
using System;
using EasyBeady.Api.Database.Domain;
using EasyBeady.Database.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EasyBeady.Api.Database.Domain.Migrations
{
    [DbContext(typeof(SchemasDbContext))]
    partial class SchemasDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("EasyBeady.Api.Database.Domain.Models.SchemaModel", b =>
                {
                    b.Property<Guid>("SchemaId")
                        .HasColumnType("binary(16)");

                    b.Property<DateTime>("CreationDate")
                        .IsRequired()
                        .HasColumnType("datetime");

                    b.Property<int>("Height")
                        .IsRequired()
                        .HasColumnType("smallint");

                    b.Property<DateTime>("LastUpdateDate")
                        .IsRequired()
                        .HasColumnType("datetime");

                    b.Property<int>("LinesCompleted")
                        .HasDefaultValueSql("0")
                        .HasColumnType("smallint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<byte[]>("Schema")
                        .IsRequired()
                        .HasColumnType("mediumblob");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("varchar(20)");

                    b.Property<Guid>("UserId")
                        .IsRequired()
                        .HasColumnType("binary(16)");

                    b.Property<int>("Width")
                        .IsRequired()
                        .HasColumnType("smallint");

                    b.HasKey("SchemaId");

                    b.ToTable("Schemas");
                });
#pragma warning restore 612, 618
        }
    }
}
