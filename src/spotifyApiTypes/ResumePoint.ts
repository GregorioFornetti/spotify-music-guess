

export default interface ResumePoint {
    /** Whether or not the episode has been fully played by the user. */
    fully_played: boolean,

    /** The user’s most recent position in the episode in miliseconds. */
    resume_position_ms: number
}