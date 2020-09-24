# presto

a pegRNA design tool

## WELCOME TO PRESTO!

This program can be used to easily generate pegRNA sequences suitable for Prime Editing (Anzalone et al 2019).

PegRNAs are made up of a custom spacer, primer binding site (PBS), reverse transcriptase template (RT) as well as the standardized scaffold segment.
Given a spacer and your desired edits, this program will output many options for PBSs and RTs you may wish to use.
These components are necessary for even the most simple prime editing scheme (PE2).

You may consider a PE3/PE3b knockin (KI) strategy, which typically increases efficency of KI. This requires an additional sgRNA (dubbed the PE3/PE3b guide).
PE3 guides cannot distinguish between edited and unedited DNA, while PE3b guides are only able to bind once the first strand has been edited.
This program will output options for both if they exist.

## INSTRUCTIONS FOR USE

To run the program from the command line use the following

```python
python presto.py
```

Once you run the program (in python3) you will be prompted for the following, respectively:

1. The wildtype sequence with parentheses surrounding any deletions you'd like to make
2. The sequence you'd like to insert (leave it blank if it's a deletion)
3. The sequence of the spacer you've chosen.

Pro tips:

All sequences should be copied in as 5' to 3' and the output is to be read 5' to 3'.
The program is not case sensitive.
If you have an unknown base in your input, use N as the placeholder. Other non-ATGC letters may result in errors.
The program works best with ~100-150bp on either side of the mutation site. The examples shown below are much shorter for easy reading.

## EXAMPLE: insertion of agcgta

ATGCGCTATGGCGATGCTGATATGCGCTATCGA()TTTGCTGATATGCGCTATCGGAGATGCTGAT  
agcgta  
GATGCTGATATGCGCTATCG

## EXAMPLE: point mutation (t->g)

ATGCGCTATGGCGATGCTGATATGCGCTATCGAT(t)TGCTGATATGCGCTATCGGAGATGCTGAT  
g  
GATGCTGATATGCGCTATCG

## EXAMPLE: deletion of TATCGA

ATGCGCTATGGCGATGCTGATATGCGC(tatcga)TTTGCTGATATGCGCTATCGGAGATGCTGAT

GATGCTGATATGCGCTATCG
